<!-- PHP code to establish connection with the localserver -->
<?php
$host='localhost';
$user = 'root';
$pass = '';
$db = 'puzzledb';
$mysqli = new mysqli($host, $user, $pass, $db);
 
// Checking for connections
if ($mysqli->connect_error) {
    die('Connect Error (' .
    $mysqli->connect_errno . ') '.
    $mysqli->connect_error);
}
// SQL query to select data from database
$sql = " SELECT name,score from users,leaderboard where users.ID = leaderboard.ID ORDER by score DESC LIMIT 5;";
$leaderboard = $mysqli->query($sql);

$sql = " SELECT name FROM users ORDER BY ID DESC LIMIT 1";
$name = $mysqli->query($sql);

$sql = " SELECT score FROM leaderboard ORDER BY ID DESC LIMIT 1";
$score = $mysqli->query($sql);

$mysqli->close();
?>

<html>
    <head>
        <!-- <link rel="stylesheet" href="leaderboard.css"> -->
        <style>
            html,body{
                font-size: 26px;
                font-family: sans-serif;
                margin: 0%;
                padding: 0%;
            }
            p{
                text-align: center;
                position: relative;
                top: 8%;
                font-size: 30px;

            }
            .table{
                position: relative;
                width: 100%;
                top: 50px;
                text-align: center;
                

            }

            table{
                max-width: 30%;
                display: inline-block;
                border: 2px solid #ed802d;
                text-align:left;
                font-size: 26px;
                padding: 10px;
                border-radius: 10px;
            }
            td{
                padding-right: 20px;
            }
            
            button{
                border: 2px solid #2f528f;
                background-color: #4473c4;
                position: relative;
                padding: 15px 20px;
                margin: 10px 0;
                width: 15%;
                border-radius: 40px;
                left: 42.5%;
                top: 17%;
            }

            a{
                font-family: sans-serif;
                font-size: 26px;
                text-decoration: none;
                color: white;
            }

            button:hover{
                background-color:#4c7fd9;
            }

            button:active {
                background-color:#2f528f;
                transform: translateY(2px);
            }

            .table:hover{
                top:48px
            }
        </style>
    </head>
    <body>
        <?php while($rows=$name->fetch_assoc()){ ?>
        <p>Congratulations <?php echo $rows['name'] ?>
        ! </p>
        <?php } ?>

        <?php while($rows=$score->fetch_assoc()){ ?>
        <p>Your Score is 
            <?php echo $rows['score'] ?>
        </p>
        <?php } ?>

            <div class = "table">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                <!-- PHP CODE TO FETCH DATA FROM ROWS -->
                <?php
                    while($rows=$leaderboard->fetch_assoc())
                    {
                ?>
                <tr>
                    <td><?php echo $rows['name'];?></td>
                    <td><?php echo $rows['score'];?></td>
                    <?php
                        }
                    ?>
                </tr>  
            </table>
        </div>
        <button><a href="index.html">HOME</a></button>
        <script src="game.js"></script>
        <source src="Sounds/Celeboard.mp3" type="audio/ogg">
        <embed src="Sounds/Celeboard.mp3" autostart="true" loop="true" hidden="true"> 
    </body>
</html>