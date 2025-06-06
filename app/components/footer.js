const footer = {
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px",
    background: "var(--main-bg-color)",
};

const p = {
    lineHeight: "1",
    height: "20px",
};

const margin = {
    height: "100px",
    width: "100vw",
    borderBottom: "1px solid rgb(58, 58, 58)",
};

export default function Footer() {
    return (
        <div style={footer}>
            <div style={margin}></div>
            <div style={{ display: "flex", alignItems: "center", height: "100px" }}>
                <p style={p}>millivie</p>
            </div>
        </div>
    );
}
