const styles: Record<string, React.CSSProperties> = {
  "virtual-scroll-wrapper": {
    flex: "1 1 100%",
    position: "relative",

    overflow: "hidden",
    overflowY: "auto",
  },
  "virtual-scroll-list": {
    position: "absolute",
    top: 0,

    listStyle: "none",
    margin: 0,
    padding: 0,

    height: "100%",
    width: "100%"
  },
  "virtual-scroll-element": {
    position: "absolute",
    width: "100%",
    display: "block",

    overflow: "hidden"
  }
};

export default styles;