import githubIcon from "./../assets/github-mark.svg";
import linkedinIcon from "./../assets/linkedin.svg";

function Footer() {
    const githubUrl = "https://github.com/Juudini";
    const linkedinUrl = "https://www.linkedin.com/in/juandebandi/";

    return (
        <footer>
            <div className="icons-container fixed bottom-4 right-12">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="GitHub" className="icon w-7" />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <img
                        src={linkedinIcon}
                        alt="Portfolio"
                        className="icon w-7"
                    />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
