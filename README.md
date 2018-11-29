# Virtual Scroll

### Installation

```bash
npm install @tenchleb/react-virtual-scroll
```

### Usage
```jsx
import { VirtualScroll } from "@tenchleb/react-virtual-scroll";

const styles = {
    display: "flex",
    maxHeight: "256px",
    width: "100%"
};

export X extends React.PureComponent {
    ...
    render() {
        return (
            <div style={ styles }>
                <VirtualScroll height={ 64 }>
                    {
                        list.map(element => (
                            <span> { element.name } </span>
                        ))
                    }
                </VirtualScroll>
            </div>
        );
    }
}

```
Example: https://codesandbox.io/s/rmy3xoq2n
