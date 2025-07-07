const footer = {
    height: "100px",
    marginTop: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--main-bg-color)",
    borderTop: "1px solid rgb(58, 58, 58)",
};

const test = {
    height: "auto",
    width: "100%",
    background: "var(--main-bg-color)",
};

export default function Footer() {
    return (
        <>
            <div style={footer}>
                <p>millivie</p>
            </div>
            <div style={test}></div>
        </>
    );
}
