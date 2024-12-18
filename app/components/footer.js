const footer = {
    height: "100px",
    marginTop: "100px",
    borderTop: "1px solid rgb(58, 58, 58)",
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
    background: "var(--main-bg-color)",
};

export default function Footer() {
    return (
        <div style={footer}>
            <p>millivie</p>
        </div>
    );
}
