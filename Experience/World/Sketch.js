import { Howl } from "howler";

export default function Sketch() {
    window.ml5 = ml5;

    return (_) => {
        let imageModelURL = '';
        let video;
        let flippedVideo;
        let label = "";
        let classifier;

        let count = 0;

        var beep = new Howl({
            src : ['beep.mp3']
        })

        _.preload = () => {
            classifier = ml5.imageClassifier(imageModelURL + 'model.json')
        }
        _.setup = () => {
            video = _.createCapture(_.VIDEO);
            video.size(320, 240);
            video.hide();
            flippedVideo = video;
            classifyVideo();
        }

        function classifyVideo() {
            classifier.classify(flippedVideo, gotResult);
        }

        function gotResult(err, results) {
            if (err) {
                console.log(err);
                return;
            }

            if (results[0].label == 'Class 2') {
                count += 1;
            }

            if( count == 30 ){
                console.log("BEEP");
                beep.play();
                count = 0 ; 
            }

            classifyVideo();
        }
    }
}