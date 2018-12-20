import * as React from "react";
import styles from "./styles";
import { Bind, Suspend } from './helpers';
import { VirtualScrollList } from "./VirtualScrollList";

interface VirtualScrollProps {
    height: number,
    children: React.ReactChild[],

    touchBefore: number,
    touchAfter: number,
    onTouchAfter?: (range: number, length: number) => void,
    onTouchdown?: (range: number, length: number) => void,
}

interface VirtualScrollState {
    scrollTop: number;
}

export class VirtualScroll extends React.Component<VirtualScrollProps, VirtualScrollState> {
    private wrapper: React.RefObject<HTMLDivElement> = React.createRef();
    private mutation: MutationObserver;
    public props: VirtualScrollProps;
    public state: VirtualScrollState = {
        scrollTop: 0
    }

    static defaultProps = {
        touchBefore: 0,
        touchAfter: 0,
    }

    select({ scrollTop }: VirtualScrollState = this.state) {
        const { current: element } = this.wrapper;
        const { height, children } = this.props;

        const clientHeight = (element && element.clientHeight) || 0;
        const offsetIndex = Math.floor(Math.abs(scrollTop) / height);
        const endIndex = Math.round((scrollTop + clientHeight) / height);

        return {
            offsetIndex,
            endIndex,
            selection: children.slice(offsetIndex, endIndex)
        }
    }

    @Bind
    onScroll() {
        const { current: element } = this.wrapper;
        const scrollTop = (element && element.scrollTop) || 0;

        this.setState({ scrollTop });
    }

    @Bind
    onResize() {
        const { current: element } = this.wrapper;
        const scrollTop = (element && element.scrollTop) || 0;

        this.setState({ scrollTop });
    }

    @Suspend()
    touchdown(range: number, length: number) {
        const { onTouchdown } = this.props;

        return onTouchdown(range, length);
    }

    @Suspend()
    touchAfter(range: number, length: number) {
        const { onTouchAfter } = this.props;

        return onTouchAfter(range, length);
    }

    componentDidMount() {
        const { current: wrapper } = this.wrapper;

        this.onResize();
        this.onScroll();

        document.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        document.removeEventListener('resize', this.onResize);
    }

    componentDidUpdate() {
        const { children, touchAfter } = this.props;
        const { selection, endIndex } = this.select(this.state);

        const didTouchAfter = () => (children.length - touchAfter) < touchAfter 
            ? true : (children.length - touchAfter) <= endIndex;

        const didTouchdown = () => endIndex === children.length;

        if ( this.props.onTouchAfter && didTouchAfter() )
            this.touchAfter(selection.length, children.length);

        if ( this.props.onTouchdown && didTouchdown() )
            this.touchdown(selection.length, children.length);
    }

    render() {
        const { height, children } = this.props;
        const { offsetIndex, endIndex, selection } = this.select(this.state);

        const renderList = () => {
            if ( typeof selection === 'string' )
                return null;
            return (
                <VirtualScrollList 
                    list={ selection }
                    length={ children.length }
                    height={ height } 
                    offsetIndex={ offsetIndex } 
                />
            );
        }

        return (
            <div
                className="virtual-scroll-wrapper"
                style={ styles["virtual-scroll-wrapper"] }
                ref={this.wrapper}
                onScroll={this.onScroll}
            >
                { renderList() }

                <div 
                    className="virtual-scroll-expander"
                    style={{ height: this.props.children.length * height }}>
                </div>
            </div>
        )
    }

}
