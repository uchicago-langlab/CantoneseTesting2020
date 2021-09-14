// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null); // Shorten command names (keep this line here)


PreloadZip('https://www.langlab123.com/expt_materials/can_materials_img.zip');
PreloadZip('https://www.langlab123.com/expt_materials/can_materials_audio.zip');
// PreloadZip('https://www.langlab123.com/expt_materials/can_materials.zip');
// PreloadZip('https://weixu16.dreamhosters.com/expt_materials/can_materials.zip');

DebugOff();

Sequence("intro", "instruction", "instruction_sum1", "initiate", "p_trials_0", "instruction_sum2", "p_trials", subsequence( randomize("d_trials") , randomize("rf_trials") ), 'subj_info', "exit");

var completionMessage = "数据传送完毕。 非常感谢您的参与！"
var defaults = [
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "点击此键继续。"
    }
];

// Questionnaires and introduction
var items = [

["intro", "Form", {consentRequired: true, html: {include: "consent.html" }} ],
["intro", "Form", {consentRequired: true, html: {include: "intro1.html" }} ],
["subj_info", "Form", {consentRequired: true, html: {include: "intro.html" }} ],

];


// Presenting experiment instruction
newTrial("instruction",
    defaultText
        .print()
    ,
    newAudio("instruction_audio", "cantonese_instruction.wav")
        .play()
    ,
    newText("<strong>具体实验过程：</strong>")
    ,
    newText("<p>本次实验中，你将会依次看到一系列图片及词语，并通过录音的形式以<strong><u><i>广东话</i></u></strong>用所给词语描述图片中的场景。</p>")
    ,
    newText("<p>每次录音时，你需要点击图片下方的红色圆形按钮开始录音，并在叙述完毕后再次点击红色圆形按钮结束录音。录音结束后你可以点击播放键回放刚才的录音。</p>")
    ,
    newImage("recording_button.png")
        .print()
    ,
    newText("<p>录音完成后，在录音键下方会出现如下图所示的矩形按钮，提示您进入下一张图片。若未出现该按钮，请注意检查是否有再次点击红色按钮结束录音。</p>")
    ,
    newImage("next_button.png")
        .print()
    ,
    newText("<p>请注意！每张图片您只有一次录音机会，再次点击红色按钮结束录音后该按钮将会失效。若您需要更改录音内容，只需在<strong>再次点击红色按钮结束录音前</strong>继续重新叙述更正后的内容即可。</p>")
    ,
    newButton("continue", "点击此键继续")
        .print()
        .wait()
    ,
    getAudio("instruction_audio")
        .stop()
);

newTrial("instruction_sum1",
    defaultText
        .print()
    ,
    newAudio("instruction_sum1_audio", "cantonese_instruction_sum.wav")
        .play()
    ,
    newText("<strong>实验过程要点总结：</strong>")
    ,
    newText("<p>1. 点击红色按钮开始录音。</p>")
    ,
    newText("<p>2. 录音结束后再次点击红色按钮结束录音。</p>")
    ,
    newText("<p>3. 如果想听回放可以点击绿键， 但不能再次录音。</p>")
    ,
    newText("<p>4. 录音完成后，点击矩形按钮进入下一张图片。</p>")
    ,
    newText("<p>5. 请以广东话用一句话描述图片，用到图片上提供的动词。</p>")
    ,
    newButton("continue", "点击此键继续")
        .print()
        .wait()
    ,
    getAudio("instruction_sum1_audio")
        .stop()
);


// Authorization page for VoiceRecorder
let replaceConsentMic = ()=>{
        let consentLink = $(".PennController-PennController a.Message-continue-link");
        if (consentLink.length > 0 && consentLink[0].innerHTML.match(/^By clicking this link I understand that I grant this experiment's script access to my recording device/))
            consentLink.html("请点击此蓝色链接以授权使用您的录音设备");
        else
            window.requestAnimationFrame( replaceConsentMic );
};
window.requestAnimationFrame( replaceConsentMic );
// Indicate where to look for the PHP file you uploaded on you server
InitiateRecorder("https://www.langlab123.com/cantonese_testing/setup.php", "本次实验将收集您的音频样本，您的浏览器可能会弹出窗口提示您授权录音设备的使用。通过授权录音设备并继续参与本次实验，您将同时授权本次实验的研究人员匿名收集您在本次实验中的音频样本。收集到的音频文件将被上传并托管到研究人员指定的服务器上。如果您接受本次请求，在整个实验过程中您将会在实验窗口顶部看到一个录音标签，提示您系统是否正在收集您的录音记录。")
    .label("initiate");

// P trial exercise
newTrial("p_trials_0",
    newAudio("exercise_audio", "cantonese_exercise.wav")
        .play()
    ,
    newText("trial_instruction", "<strong>现在是练习环节，以帮助您熟悉实验流程。</strong>")
        .print()
    ,
    newText("trial_instruction", "您的任务是以广东话用<strong>一句话</strong>描述这张图片，请用到图片上提供的<strong>动词</strong>:")
        .print()
    ,
    newImage("cantonese_01.png")
        .print()
    ,
    newVoiceRecorder("can_p01")
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "点击此键继续")
        .print()
        .wait()
    ,
    getAudio("exercise_audio")
        .stop()
);

newTrial("instruction_sum2",
    defaultText
        .print()
    ,
    newAudio("instruction_sum2_audio", "cantonese_instruction_sum.wav")
        .play()
    ,
    newText("<strong>您掌握了吗？</strong>")
    ,
    newText("<p>1. 点击红色按钮开始录音。</p>")
    ,
    newText("<p>2. 录音结束后再次点击红色按钮结束录音。</p>")
    ,
    newText("<p>3. 如果想听回放可以点击绿键， 但不能再次录音。</p>")
    ,
    newText("<p>4. 录音完成后，点击矩形按钮进入下一张图片。</p>")
    ,
    newText("<p>5. 请以广东话用一句话描述图片，用到图片上提供的动词。</p>")
    ,
    newText("<p>在掌握了以上实验要点后，请点击下方按钮正式开始实验。</p>")
    ,
    newButton("continue", "点击此键开始实验")
        .print()
        .wait()
    ,
    getAudio("instruction_sum2_audio")
        .stop()
);

// p trials
newTrial("p_trials",
    newText("trial_instruction", "请以广东话用<strong>一句话</strong>描述图片，用到图片上提供的<strong>动词</strong>。")
        .print()
    ,
    newImage("cantonese_02.png")
        .print()
    ,
    newVoiceRecorder("can_p02")
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "点击此键进入下一张图片")
        .print()
        .wait()
);

newTrial("p_trials",
    newText("trial_instruction", "请以广东话用<strong>一句话</strong>描述图片，用到图片上提供的<strong>动词</strong>。")
        .print()
    ,
    newImage("cantonese_03.png")
        .print()
    ,
    newVoiceRecorder("can_p03")
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "点击此键进入下一张图片")
        .print()
        .wait()
);

// D Trials
Template( "CantoneseDTrials.csv", variable => 
  newTrial("d_trials",
    newText("trial_instruction", "请以广东话用<strong>一句话</strong>描述图片，用到图片上提供的<strong>动词</strong>。")
        .print()
    ,
    newImage(variable.CantoneseImages)
        .print()
    ,
    newVoiceRecorder(variable.OutputAudios)
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "点击此键进入下一张图片")
        .print()
        .wait()
    )
);


// RF Trials
Template( "CantoneseRFTrials.csv", variable => 
  newTrial("rf_trials",
    newText("trial_instruction", "请以广东话用<strong>一句话</strong>描述图片，用到图片上提供的<strong>动词</strong>。")
        .print()
    ,
    newImage(variable.CantoneseImages)
        .print()
    ,
    newVoiceRecorder(variable.OutputAudios)
        .once()
        .print()
        .wait()
    ,
    newButton("continue", "点击此键进入下一张图片")
        .print()
        .wait()
    )
);


// Completion screen for the experiement
var items = [
["exit", "Form", {consentRequired: false, html: {include: "exit.html" }} ],
];
