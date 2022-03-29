prediction1 = "";
prediction2 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = "<img id='image' src='" + data_uri + "'>";
    });
}

console.log("ml5 version :" , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JeBVnF-b2/model.json' , modelLoaded);

function modelLoaded(){

    console.log("Model Is Loaded");
}

function speak(){

    var synth = window.speechSynthesis;
    speak_data1 = "The First Prediction Is" + prediction1;
    speak_data2 = "And The Second Prediction Is" + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterthis);
}

function check(){

    img = document.getElementById("image");
    classifier.classify(img , gotResults);
}

function gotResults(error , results){

    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if(results[0].label == "Happy"){

            document.getElementById("update_emoji").innerHTML = "&#128522";
        }

        if(results[0].label == "Sad"){

            document.getElementById("update_emoji").innerHTML = "&#128532";
        }

        if(results[0].label == "Surprise"){

            document.getElementById("update_emoji").innerHTML = "&#128559";
        }

        if(results[1].label == "Happy"){

            document.getElementById("update_emoji2").innerHTML = "&#128522";
        }

        if(results[1].label == "Sad"){

            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }

        if(results[1].label == "Surprise"){

            document.getElementById("update_emoji2").innerHTML = "&#128559";
        }

    }
}