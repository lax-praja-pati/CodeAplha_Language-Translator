async function translateText() {

    const text = document.getElementById("inputText").value.trim();

    const source = document.getElementById("sourceLang").value;

    const target = document.getElementById("targetLang").value;

    const output = document.getElementById("outputText");

    if (text === "") {
        alert("Please enter text");
        return;
    }

    output.value = "Translating...";

    try {

        const response = await fetch(
            "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + source +
            "&tl=" +
            target +
            "&dt=t&q=" +
            encodeURIComponent(text)
        );

        const data = await response.json();

        let translatedText = data[0]
            .map(item => item[0])
            .join("");

        output.value = translatedText;

    } catch (error) {

        console.log(error);

        output.value = "Translation Failed";
    }
}



function copyText() {

    const output = document.getElementById("outputText");

    if (output.value === "") {
        alert("No text to copy");
        return;
    }

    navigator.clipboard.writeText(output.value);

    alert("Copied Successfully");
}



function speakText() {

    const text = document.getElementById("outputText").value;

    if (text === "") {
        alert("No translated text");
        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    const lang = document.getElementById("targetLang").value;

    if (lang === "hi") {
        speech.lang = "hi-IN";
    }

    else if (lang === "fr") {
        speech.lang = "fr-FR";
    }

    else if (lang === "es") {
        speech.lang = "es-ES";
    }

    else if (lang === "de") {
        speech.lang = "de-DE";
    }

    else {
        speech.lang = "en-US";
    }

    window.speechSynthesis.speak(speech);
}