<!--
/////////////////////////////////////////////////////////////
/// Escapausorus v1 (2020)
///	A quick and dirty framework to create small adventure game (certified vanilla JS)
/// Author: Stéphanie Mader (http://smader.interaction-project.net)
/// GitHub: https://github.com/RedNaK/escaposaurus
///	Licence: MIT
////////////////////////////////////////////////////////////
-->

	/*
		HERE IS THE CONFIGURATION OF THE GAME
	*/
		/*either online with VOD server and JSON load of data
		either local */
		var isLocal = true ;
 		var gameRoot = "./" ;
 		var gameDataRoot = gameRoot+"escaposaurus_boite_de_conserve/" ;
 		var videoRoot = gameDataRoot+"videos/" ;

 		/*caller app*/
		var contactVideoRoot = videoRoot+"contactVideo/" ;

		/*full path to intro / outro video*/
		var missionVideoPath = videoRoot+"introVideo/intro1.mp4" ;
		var introVideoPath = videoRoot+"introVideo/intro2.mp4" ;
		var missingVideoPath = videoRoot+"contactVideo/missing/final.mp4" ;
		var epilogueVideoPath = videoRoot+"epilogueVideo/epiloguecredit.mp4" ;

		/*udisk JSON path*/
		var udiskRoot = gameDataRoot+"udisk/" ;

		/*for online use only*/
		/*var udiskJSONPath = gameRoot+"escaposaurus_gamedata/udisk.json" ;
		var udiskJSONPath = "/helper_scripts/accessJSON_udisk.php" ;*/

		var udiskData =
	  	{
            "root": {
                "folders": [
                    {
                        "foldername": "network at 192.168.1.69",
                        "password": "1234",
                        "sequence": 0,
                        "folders": [
                            {
                                "foldername": "hugh_gunn",
                                "files": [ "affiche-rombo.jpg", "rombo_desert.jpg", "rombo_arctique.jpg", "rombo_jungle.jpg" ]
                            },
                            {
                                "foldername": "mike_rowave",
                                "password": "01/01/1969",
                                "sequence": 3,
                                "files": [ "RAPPORT_ULTRA_CONFIDENTIEL_V3_FINAL_FINAL.png", "vlog.mp4" ]
                            },
                            {
                                "foldername": "albert_jr_smart",
                                "folders": [
                                    {
                                        "foldername": "mails",
                                        "password": "albert.smart@ccc.fr",
                                        "sequence": 2,
                                        "files": [ "mercipapa.jpg", "test.jpg", "conserve.jpg" ]
                                    }
                                ]
                            },
                            {
                                "foldername": "screen_cam_data",
                                "files": [ "09.09.2025-09-00-00.png", "09.09.2025-10-30-00.png" ],
                                "folders": [
                                    {
                                        "foldername": "camera",
                                        "password": "rombo",
                                        "sequence": 1,
                                        "files": [ "09.09.2025-09-17-52.png", "09.09.2025-09-18-03.png", "09.09.2025-09-18-34.png", "09.09.2025-09-52-25.png", "09.09.2025-09-52-38.png", "09.09.2025-09-52-54.png", "09.09.2025-10-18-47.png", "09.09.2025-10-19-22.png" ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "files": [
                    "albert + 1234 = 🥰.jpg"
                ]
            }
		} ;

		var gameTitle = "BIG PLACEHOLDER (conserve)" ;
		var gameDescriptionHome = "Vous incarnez un hacker spécialiste dans l'infiltration de réseaux informatiques. Une entreprise vous a contacté pour récupérer des données stockées sur un serveur..." ;
		var gameMissionCall = "Voici la vidéo que Mme Ashe Rodrigo a envoyé à votre bureau d'informaticien spécialisé en récupération de données" ;
		var gameMissionAccept = "&raquo;&raquo; Accepter la mission et commencer l'infiltration dans le serveur (JOUER) &laquo;&laquo;" ;

		var gameCredit = "Un jeu conçu et réalisé par : <br/>Stéphanie Mader" ;
		var gameThanks = "Remerciements : <br/> Stéphanie Mader" ;

		var OSName = "TempleOS 5.04" ;
		var explorerName = "PROCESS HACKER" ;
		var callerAppName = "CONTACTS" ;

		/*titles of video windows*/
		var titleData = {} ;
		titleData.introTitle = "INTRODUCTION" ;
		titleData.epilogueTitle = "EPILOGUE" ;
		titleData.callTitle = "APPEL EN COURS..." ;

		/*change of caller app prompt for each sequence*/
		var promptDefault = "Rien à demander, ne pas les déranger." ;
		var prompt = [] ;
		prompt[0] = "Questionner Ashe sur le serveur" ;
		prompt[1] = "Questionner Ashe sur les caméras" ;
		prompt[2] = "Questionner Ashe sur les mails" ;
		prompt[3] = "" ;
		prompt[4] = "Envoyer les infos à Ashe" ;

		/*when the sequence number reach this, the player win, the missing contact is added and the player can call them*/
		var sequenceWin = 4 ;

		/*before being able to call the contacts, the player has to open the main clue of the sequence as indicated in this array*/
		/*if you put in the string "noHint", player will be able to immediatly call the contact at the beginning of the sequence*/
		/*if you put "none" or anything that is not an existing filename, the player will NOT be able to call the contacts during this sequence*/
		var seqMainHint = [] ;
		seqMainHint[0] = "wouf.png" ;
		seqMainHint[1] = "affiche-rombo.jpg" ; /*if you put anything that is not an existing filename of the udisk, the player will never be able to call any contacts or get helps during this sequence*/
		seqMainHint[2] = "09.09.2025-10-19-22.png" ;
		seqMainHint[3] = "mercipapa.jpg" ;

		/*contact list, vid is the name of their folder in the videoContact folder, then the game autoload the video named seq%number of the current sequence%, e.g. seq0.MP4 for the first sequence (numbered 0 because computer science habits)
	their img need to be placed in their video folder, username is their displayed name
		*/
		var normalContacts = [] ;
		normalContacts[0] = {"vid" : "Denise", "vod_folder" : "", "username" : "Ashe Rodrigo", "canal" : "video", "avatar" : "denise_avatar.jpg"} ;

		/*second part of the list, contact that can help the player*/
		var helperContacts = [] ;
		helperContacts[0] = {"vid" : "Albert", "vod_folder" : "", "username" : "ChatGPT (pour avoir un indice)", "canal" : "txt", "avatar" : "albert.png", "bigAvatar" : "albertbig.png"} ;


		/*ce qui apparait quand on trouve le dernier élément du disque dur*/
		finalStepAdded = "Vous avez accès aux rapports de l'équipe scientifique. Examinez-les puis appelez Ashe." ;

		/*the last call, it can be the person we find in the end or anyone else we call to end the quest, allows the game to know it is the final contact that is called and to proceed with the ending*/
		var missingContact = {"vid" : "missing", "vod_folder" : "","username" : "Ashe Rodrigo",  "canal" : "video", "avatar" : "nata_avatar.jpg"} ;

		/*Lou only send text message, they are stored here*/
		var tips = {} ;
		tips['Albert'] = [] ;
		tips['Albert'][0] = "En tant que modèle de langage tout à fait éthique, je ne peux pas vous aider à vous introduire dans un système sécurusé." ;
		tips['Albert'][1] = "" ;
		tips['Albert'][2] = "" ;
        tips['Albert'][3] = "";


		/*text for the instruction / solution windows*/
		var instructionText = {} ;
		instructionText.winState = "Vous avez retrouvé l'id GPS et vous pouvez appeler les secours du secteur." ;
		instructionText.lackMainHint = "" ;
		instructionText.password = "Vous devez trouver et entrer le mot de passe d'un des dossiers de la boite de droite. Vous pouvez trouver le mot de passe en appelant les contacts de la boite de gauche.<br/>Pour entrer un mot de passe, cliquez sur le nom d'un dossier et une fenêtre s'affichera pour que vous puissiez donner le mot de passe." ;

		/*please note the %s into the text that allow to automatically replace them with the right content according to which sequence the player is in*/
		var solutionText = {} ;
		solutionText.winState = "Si Sabine a été secourue, le jeu est fini bravo." ;
		solutionText.lackMainHint = "Vous devez ouvrir le fichier <b>%s</b><br/>" ;
		solutionText.password = "Vous devez déverouiller le dossier <b>%s1</b><br/>avec le mot de passe : <b>%s2</b><br/>" ;
