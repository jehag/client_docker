import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Caption from "../../components/caption/Caption";
import ChooseImage from "../../components/choose-image/Choose-image";
import styles from "./Caption.module.css";

export default function CaptionPage() {
    const [serverApiUrl, setServerApiUrl] = useState('');
    const [frenchCaption, setFrenchCaption] = useState("");
    const [englishCaption, setEnglishCaption] = useState("");
    const [imageTags, setImageTags] = useState("");
    const [celebrityName, setCelebrityName] = useState("");
    const [logo, setLogo] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const url = process.env.REACT_APP_SERVER_API_URL;
        if (url) setServerApiUrl(url);
        console.log(url)
    }, [setServerApiUrl]);

    async function onChooseImage(image) {

        try {
            setIsLoading(true);

            const imageBase64 = await loadImageBase64(image);

            const serverRes = await fetchGeneratedCaption(imageBase64);
            console.log(serverRes);

            const { translatedRes, faceRes, logoRes } = serverRes;

            setEnglishCaption(translatedRes.captions[translatedRes.captions.length - 1][0]);
            setFrenchCaption(translatedRes.captions[translatedRes.captions.length - 1][1]);
            setImageTags(translatedRes.tags);
            setCelebrityName(faceRes.prediction);
            setLogo(logoRes.prediction);
            setTimeout(() => setIsLoading(false), 200);

        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    function loadImageBase64(image) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const imageBase64 = reader.result.split(',')[1];
                resolve(imageBase64);
            }, false);

            reader.addEventListener("error", (error) => {
                reject(error);
            }, false);

            if (image) {
                reader.readAsDataURL(image);
            }
        });
    }

    async function fetchGeneratedCaption(imageBase64) {
        console.log(`${serverApiUrl}/caption-single-image`);
        const response = await fetch(`${serverApiUrl}/caption-single-image`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                image: imageBase64
            })
        });
        const res = await response.json();
        
        const translatedRes = res.translatedRes;
        translatedRes.tags = translatedRes.tags
                                        .filter(tag => tag[1] > 0.01)
                                        .sort((a, b) => b[1] - a[1])
        const faceRes = res.faceRes;
        const logoRes = res.logoRes;

        return { translatedRes, faceRes, logoRes };
    }

    return (
        <main>
            <Link to='/' className={styles['go-back']}>
                <FaArrowLeft />
            </Link>

            <div className={styles['choose-file']}>
                <ChooseImage onChooseImage={onChooseImage} />
            </div>

            <div className={styles['image-caption']}>
                {isLoading ?
                    <div className={styles['loading-container']}>
                        <div className={styles["spinner-container"]}>
                            <div className={styles["loading-spinner"]}></div>
                        </div>
                    </div>
                    :
                    frenchCaption ?
                    <Caption 
                        frenchCaption={frenchCaption} 
                        englishCaption={englishCaption}
                        imageTags={imageTags}
                        celebrityName={celebrityName}
                        logo={logo}
                    />
                    :
                    <></>
                }
                
            </div>
        </main>
    );
}