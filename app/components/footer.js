const footer = {
    height: "100px",
    marginTop: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--main-bg-color)",
    borderTop: "1px solid rgb(58, 58, 58)",
};

export default function Footer() {
    return (
        <div style={footer}>
            <p>millivie</p>
        </div>
    );
}
