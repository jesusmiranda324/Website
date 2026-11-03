function Spotify() {

    const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

    const generateRandomString = (length) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let result = "";

        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }

        return result;
    };

    const generateCodeChallenge = async (codeVerifier) => {
        const data = new TextEncoder().encode(codeVerifier);

        const digest = await window.crypto.subtle.digest(
            "SHA-256",
            data
        );

        return btoa(
            String.fromCharCode(...new Uint8Array(digest))
        )
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    };

    const connectSpotify = async () => {
        const redirectURI = "http://127.0.0.1:5173/callback";

        const codeVerifier = generateRandomString(128);

        sessionStorage.setItem("code_verifier", codeVerifier);

        const codeChallenge = await generateCodeChallenge(codeVerifier);

        const scope = "user-read-private user-read-email";

        const authURL =
            "https://accounts.spotify.com/authorize" +
            "?client_id=" + clientID +
            "&response_type=code" +
            "&redirect_uri=" + encodeURIComponent(redirectURI) +
            "&scope=" + encodeURIComponent(scope) +
            "&code_challenge_method=S256" +
            "&code_challenge=" + codeChallenge;

        window.location.href = authURL;
    };

    return (
        <div>
            <button onClick={connectSpotify}>
                Connect Spotify
            </button>
        </div>
    );
}

export default Spotify;