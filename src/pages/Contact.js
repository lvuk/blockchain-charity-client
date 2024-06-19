const Contact = () => {
    return (
        <div className="Contact">
            <div className="contact-body">
                <div className="left">
                    <div>
                        <iframe
                            width="100%"
                            height="450"
                            frameborder="0"
                            scrolling="no"
                            marginheight="0"
                            marginwidth="0"
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sjenjak%2031,%20Osijek,%20Croatia+(Biteback)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        >
                            <a href="https://www.gps.ie/">gps devices</a>
                        </iframe>
                    </div>
                </div>
                <div className="middle">
                    <div className="middle-content">
                        <p>📍: Sjenjak 31, Osijek, Croatia</p>
                        <p>📞: +385 (0) 31 555-555</p>
                        <p>📠: +385 (0) 31 51-51-551</p>
                    </div>
                </div>
                <div className="right">
                    <h1>Contact Us!</h1>
                    <form action="" className="form">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="input"
                            placeholder="Enter your name"
                        />

                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="input"
                            placeholder="Enter your email"
                        />

                        <textarea
                            type="text"
                            id="message"
                            name="message"
                            className="input"
                            placeholder="Your message to us"
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Contact;
