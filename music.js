class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}


const musicList = [
    new Music("Sopa", "Hande Yener","sopa.png","Sopa (Clup Remix).mp3"),
    new Music("Olsun", "Sertap Erener","olsun.jpg","Sertab Erener - Olsun.mp3"),    
    new Music("Yankı", "Simge","yanki.jpg","Simge - Yankı.mp3"),    
    new Music("Araba", "M. Lisa","araba.jpeg","M Lisa - ARABA.mp3"),
    new Music("Kazılı Kuyum", "Yüzyüzeyken Konuşuruz","kazili-kuyum.jpeg","Kazılı Kuyum.mp3"),
    new Music("We Could Be The Same", "Manga","we-could-be-the-same.jpg","We Could Be The Same (Istanbul).mp3")  
];
