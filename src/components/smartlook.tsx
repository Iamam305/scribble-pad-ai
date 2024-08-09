"use client"

import Script from "next/script";

const SmartlookSnippet = () => {

    return (
        <div>
            <Script id="smartlook-snippet">
                {`
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '75930a8e78deaf34f6e70b790f3af049c0e166f5', { region: 'eu' });
        `}
            </Script>
        </div>
    );
};

export default SmartlookSnippet