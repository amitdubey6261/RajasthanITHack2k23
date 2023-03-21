import { Howl } from "howler";

export default function Sketch(em) {
    window.ml5 = ml5;

    return (_) => {
        let imageModelURL = 'https://teachablemachine.withgoogle.com/models/BFWVsck50/';
        let video;
        let flippedVideo;
        let label = "";
        let classifier;

        let countL = 0;
        let countC = 0;
        let countR = 0;
        let countN = 0;

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

            // console.log(results)


            if(results[0].label == 'C'){
                countC +=1 ;
            }

            if(results[0].label == 'N'){
                countN +=1 ; 
            }

            if(results[0].label == 'L'){
                countL +=1 ; 
            }

            if(results[0].label == 'R'){
                countR += 1 ; 
            }

            if( countC == 20 ){
                em.emit("C");
                console.log("C");
                countC = 0 ;
            }
            
            if( countL == 20 ){
                em.emit("L");
                console.log("L");
                countL = 0 ;
            }
            
            if( countR == 20){
                em.emit("R");
                console.log("R");
                countR = 0 ; 
            }
            
            if( countN == 20 ){
                em.emit("N");
                console.log("N");
                countN = 0 ; 
            }

            classifyVideo();
        }
    }
}