export const Pdf = () => {
    return (
        <div
            css={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                padding: '2rem 2rem 2rem 3rem',
                fontFamily: 'Arial, Helvetica, sans-serif',
                color: theme.text.primaryColor,
            })}
        ></div>
    )
}
