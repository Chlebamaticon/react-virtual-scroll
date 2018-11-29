import * as React from "react";
import styles from "./styles";
import { Suspend } from './helpers/suspend';
import { VirtualScrollList } from "./VirtualScrollList";

interface VirtualScrollProps {
    height: number,
    children: React.ReactNodeArray,

    touchBefore: number,
    touchAfter: number,
    onTouchAfter?: (range: number, length: number) => void,
    onTouchdown?: (range: number, length: number) => void,
}

interface VirtualScrollState {
  offsetIndex: number,
  endIndex: number,
  selection: React.ReactNode[] | string
}

export class VirtualScroll extends React.Component<VirtualScrollProps, VirtualScrollState> {
    private wrapper: React.RefObject<HTMLDivElement> = React.createRef();
    public state: VirtualScrollState;
    public props: VirtualScrollProps;

    static defaultProps = {
        touchBefore: 0,
        touchAfter: 0,
    }

    constructor(props: VirtualScrollProps) {
        super(props);

        this.state = {
            offsetIndex: 0,
            endIndex: 0,
            selection: []
        };
    }

    select(scrollTop: number, clientHeight: number) {
        const { height, children } = this.props;

        const offsetIndex = Math.floor(Math.abs(scrollTop) / height);
        const endIndex = Math.round((scrollTop + clientHeight) / height);

        return {
            offsetIndex,
            endIndex,
            selection: children.slice(offsetIndex, endIndex)
        }
    }

    reshuffle() {
        const { current: element } = this.wrapper;
        const scrollTop = (element && element.scrollTop) || 0;
        const clientHeight = (element && element.clientHeight) || 0;

        const {
            offsetIndex,
            endIndex,
            selection
        } = this.select(scrollTop, clientHeight);

        this.setState({
            offsetIndex,
            endIndex,
            selection
        });
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
        this.reshuffle();
    }

    shouldComponentUpdate(nextProps: VirtualScrollProps, nextState: VirtualScrollState) {
        const { children } = this.props;
        const { offsetIndex, endIndex } = this.state;

        return (
            !(offsetIndex === nextState.offsetIndex
            && endIndex === nextState.endIndex ) 
            || ( children.length !== nextProps.children.length )
        );
    }

    componentDidUpdate() {
        const { selection, endIndex } = this.state;
        const { children, touchAfter } = this.props;

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
        const { offsetIndex, selection } = this.state;

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
                onScroll={() => this.reshuffle()}
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
