import {useEffect} from "react";

export async function FontAwesome(){
    return (
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
            type="text/css"
            />
    );
}

export async function DarkMode(){
    return (
        <script
            dangerouslySetInnerHTML={{
            __html: `
            (function() {
                try {
                if (localStorage.getItem('theme') === 'dark') {
                    document.documentElement.classList.add('dark');
                }
                } catch (e) {}
            })();
            `,
            }}
        />
    )
}