<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require "conn.php";
    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';
    header("Content-Type: text/plain");
    

    if(isset($_POST["send"])){
        $to = $_POST['to'];
        sendMail($conn,$to);
    }
    try {
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
    }

    //Skickar ut mail med top låtarna.
    function sendMail($conn,$to){
        $mail = new PHPMailer(true);

        $mail->IsSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->SMTPAuth = true;
        $mail->Username = 'matteusengstr.m@gmail.com';
        $mail->Password = 'jieq zedn jnfh irhz';
        $mail->SMTPSecure = 'ssl';

        $mail->setFrom('matteusengstr.m@gmail.com');
        $mail->addAddress($to);

        $mail->isHTML(true);        
        echo "Your mail is registred!"."\n";

        $stmt = $conn->prepare("INSERT INTO emails (emailName) VALUES (?)");
        $stmt->bind_param("s", $to);
        if ($stmt->execute()) {
            echo "Record updated successfully"."\n";
        } else {
            echo "Error updating record: " . $conn->error;
        }


        $mail->Subject = "This months top songs";

        $top3songs = "SELECT songname FROM songsus ORDER BY idsongs";

        $topResults = $conn->query($top3songs);

        $topSong1="";
        $topSong2="";
        $topSong3=""; 

    for ($i = 0; $i < $topResults->num_rows; $i++) {
        $row = $topResults->fetch_assoc();
        if ($i == 0) {
            $topSong1 = $row['songname'];
        } elseif ($i == 1) {
            $topSong2 = $row['songname'];
        } elseif ($i == 2) {
            $topSong3 = $row['songname'];
        }
    }

    $mail->Body = $info = "Hello, here are the UK's top three songs this month!: "."\n".$topSong1."\n".$topSong2."\n".$topSong3."\n".$_POST['info'];

        $mail->send();
    }

    //Skickar mail till alla som registrerat sina mailadresser.
    function sendToRegistredEmails($conn){
    $emails = "SELECT emailName FROM emails ORDER BY idemails";
    $emailResults = $conn->query($emails);
    for ($i = 0; $i < $emailResults->num_rows; $i++) {
        $row = $emailResults->fetch_assoc();
            $to = $row['emailName'];
            sendMail($conn,$to);
    }
    }
    
?>