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
	(1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Ludwig van Beethoven', 'Classical / Dubstep', '#e8b3e1'),
	(2, 'Sweet Child O Mine', 'C4 C5 G4 F4 F5 G4 E5 G4 C4 C5 G4 F4 F5 G4 E5 G4 D4 C5 G4 F4 F5 G4 E5 G4 D4 C5 G4 F4 F5 G4 E5 G4 F4 C5 G4 F4 F5 G4 E5 G4 F4 C5 G4 F4 F5 G4 E5 G4 C4 C5 G4 F4 F5 G4 E5 G4 C4 C5 G4 F4 F5 G4 E5 G4', "Guns N' Roses", 'Rock', '#edadaf'),
	(3, 'Sunshine of Your Love (Remix) ', 'D5 D5 C5 D5 A4 A4 G#4 G#4 G4 G4 D4 F4 D4 D5 D5 C5 D5 A4 A4 G#4 G#4 G4 G4 D4 F4 G4 D5 D5 C5 D5 A4 A4 G# G#4 G4 G4 D5 F5 D5 D5 D5 C5 D5 A4 A4 G#4 G#4 G4 G4 D5 F5 F5 D5', 'Cream', 'Pop / Rock / Blues', '#b1c8de'),
	(4, 'Come As You Are (Remix)', 'D4 D4 D#4 E4 E4 G4 E4 G4 E4 E4 D#4 D4 A4 D4 D4 A4 D4 D4 D#4 E4 E4 G4 E4 G4 E4 E4 D#4 D4 A4 D4 D4 A4 D4 D4 D#4 E4 E4 G4 E4 G4 E4 E4 D#4 D4 A4 D4 D4 A4 D4 D#4', 'Nirvana', 'Pop / Rock', '#edadaf'),
	(4, 'Runaway', 'E6 E6 E6 E6 E6 E6 E6 E6 E6 E6 E6 E6 E6 E6 E6 E5 E#6 E#6 E#6 E#5 D#6 D#6 D#6 D#5 A#6 A#6 A#5 A#6 E6', 'Kanye West', 'Hip-Hop / Alternative', '#fe0000');
