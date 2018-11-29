import * as React from "react";
import styles from "./styles";

interface VirtualScrollListProps {
    height: number,
    offsetIndex: number,
    length: number,
    list: React.ReactNode[]
}

interface VirtualScrollListState {}

export class VirtualScrollList extends React.Component<VirtualScrollListProps, VirtualScrollListState> {

    setTransform(index: number, height: number) {
        return {
            transform: `translate(0px, ${ index * height }px)`
        }
    }

    setSizing(height: number) {
        return {
            height,
            maxHeight: height
        }
    }

    setClasses(index: number) {
        const classes = [ 'virtual-scroll-element' ];

        if (index % 2 === 0)
            classes.push('is-even');
        else
            classes.push('is-odd');

        if ( index === 0)
            classes.push('is-first');
        
        if ( index === this.props.length )
            classes.push('is-last');
        
        return classes.join(' ');
    }

    render() {
        const { list, height, offsetIndex } = this.props;

        return (
            <ul 
                className="virtual-scroll-list"
                style={ styles["virtual-scroll-list"] }
            >
                { 
                    list.map((element, index) => (
                        <li
                            key={ index + offsetIndex }
                            className={ this.setClasses(index + offsetIndex) }
                            style={{
                                ...styles["virtual-scroll-element"],
                                ...this.setSizing(height),
                                ...this.setTransform(index + offsetIndex, height),
                            }}
                        >
                            { element }
                        </li>
                    )) 
                }
            </ul>
        );
    }
}