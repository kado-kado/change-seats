function alertHint(param){
    let hint
    alert('ヒント見たいの？');
    alert('仕方ないなぁ～');
    switch (param) {
        case "vertical":
            hint = "これは、席の縦の数を入力するフォームです。";
            break;

        case "horizontal":
            hint = "これは、席の横の数を入力するフォームです。";
            break;

        case "deleteRight":
            hint = "これは、一番後ろの右側の席を消すフォームです。\n席と人数が合わない場合の調節に使われます。";
            break;

        case "deleteLeft":
            hint = "これは、一番後ろの左側の席を消すフォームです。\n席と人数が合わない場合の調節に使われます。";
            break;

        case "eyesight":
            hint = "これは、前の席を希望する人に、前から2番目以内の席になるようにするフォームです。\n基本的には、JSONに含まれる、numberの値を指定してください。";
            break;

        case "girlsSeats":
            hint = "これは、女子が座る席を固定するためのフォームです。\n女子が少ない場合に班に同性がいないという状況を避けるためにあります。\n基本的に席idを入力してください。\n席idは、左上の席を0から数えます。通し番号です。"
            break;

        case "userJson":
            hint = "これは、席替えに使うJSONファイルを送るフォームです。\nREADME.mdに形式が載っています。"
            break;

        default:
            hint = "error";
    }

    alert(hint);
}