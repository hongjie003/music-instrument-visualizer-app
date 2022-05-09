CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	artist text NOT NULL,
	genre_title text NOT NULL,
	genre_color varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes, artist, genre_title, genre_color) 
VALUES 
	(1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Blue Claw Philharmonic', 'Classical / Dubstep', '#e8b3e1'),
	(2, 'Sweet Child O Mine', 'C4 C5 G4 F4 F5 G4 E5 G4 C4 C5 G4 F4 F5 G4 E5 G4 D4 C5 G4 F4 F5 G4 E5 G4 D4 C5 G4 F4 F5 G4 E5 G4 F4 C5 G4 F4 F5 G4 E5 G4 F4 C5 G4 F4 F5 G4 E5 G4 C4 C5 G4 F4 F5 G4 E5 G4 C4 C5 G4 F4 F5 G4 E5 G4', "Guns N' Roses", 'Rock', '#edadaf');
