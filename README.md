# Virtual Scroll

### Installation

```bash
npm install @tenchleb/react-virtual-scroll
```

### Usage
```jsx
import { VirtualScroll } from "@tenchleb/react-virtual-scroll";

export X extends React.PureComponent {
    ...
    render() {
        return (
            <VirtualScroll height={ 64 }>
                {
                    list.map(element => (
                        <span> { element.name } </span>
                    ))
                }
            </VirtualScroll>
        );
    }
}

```
Example: https://codesandbox.io/s/rmy3xoq2n
