import './button.css'

function Button_Link(){
    const handleButtonClick = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLScMc7zG40U4U-AIVOF2qn3S21qO99T4p4UkzfpJ0ovDlUe5qg/viewform?usp=sharing&ouid=110051464979992823944', '_blank', 'noopener,noreferrer');
    }

    return (
        <button className="Button" onClick={handleButtonClick}>
            PLEASE FILL THIS SURVEY
        </button>
    );
}

export default Button_Link;