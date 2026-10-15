import './button.css'

function Button_Link(){
    const handleButtonClick = () => {
        window.open('https://google.com', '_blank', 'noopener,noreferrer');
    }

    return (
        <button className="Button" onClick={handleButtonClick}>
            PLEASE FILL THIS SURVEY
        </button>
    );
}

export default Button_Link;