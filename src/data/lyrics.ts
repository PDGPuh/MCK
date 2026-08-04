export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export const TRACK_LYRICS: Record<string, LyricLine[]> = {
  "track-01": [
    { time: 0, text: "♪ (Intro - RPT MCK)" },
    { time: 3, text: "Yeah... RPT MCK — HVL Album" },
    { time: 6, text: "Elegie trong bóng đêm nhạt nhòa" },
    { time: 10, text: "Đêm dần trôi qua màn đêm mù tối" },
    { time: 14, text: "Tiếng nhạc vang lên câu hát lên lời" },
    { time: 18, text: "Chìm sâu vào từng khoảnh khắc không rời" },
    { time: 22, text: "Có những điều không thể thốt thành lời" },
    { time: 27, text: "Bởi vì bóng tối đưa ta về nhà" },
    { time: 32, text: "Và nhịp bass ngân vang giữa màn đêm phong ba" },
    { time: 37, text: "RPT MCK — Dark Soul Era" },
    { time: 42, text: "Giữ chặt nhịp đập nơi con tim này..." },
    { time: 47, text: "Không một ai có thể thay thế em" },
    { time: 52, text: "Nhìn lại đoạn đường chông gai đã qua" },
    { time: 57, text: "Màn đêm vụt tắt chỉ còn lại hai ta" },
    { time: 63, text: "♪ (Drop — Bass & Synths)" },
    { time: 70, text: "Giai điệu ngân lên từng câu lời hát" },
    { time: 76, text: "Trôi theo thời gian không chút tan nát" },
    { time: 82, text: "MCK — HVL Official Sound" },
  ],
  "track-02": [
    { time: 0, text: "♪ (Intro — IDK)" },
    { time: 4, text: "RPT MCK — IDK" },
    { time: 8, text: "I don't know what you want from me" },
    { time: 13, text: "Bước trong màn đêm cùng những hoài nghi" },
    { time: 18, text: "Chút không gian lặng yên khi em bước đi" },
    { time: 23, text: "Giai điệu này vẫn cứ đọng lại trên mi" },
    { time: 29, text: "Ta đi tìm lại những giấc mơ xa" },
    { time: 35, text: "Khi ánh đèn đường vụt tắt ngoài kia..." },
  ],
  "track-03": [
    { time: 0, text: "Wtf Bby I'm Lit — RPT MCK" },
    { time: 5, text: "Bật nhạc lên và quẩy hết đêm nay" },
    { time: 10, text: "Không gian xung quanh như đảo quay" },
    { time: 15, text: "RPT MCK on the mic right now!" },
    { time: 21, text: "Bóng đêm u tối tan thành khói bay..." },
  ],
  "track-04": [
    { time: 0, text: "Anh Không Muốn Nó Dễ Dàng" },
    { time: 5, text: "Mọi thứ cần phải thử thách qua thời gian" },
    { time: 11, text: "Từng bước chân vững vàng qua gian gian" },
    { time: 17, text: "Chinh phục giấc mơ chưa bao giờ dở dang..." },
  ],
  "track-05": [
    { time: 0, text: "Baby (feat. marzuz)" },
    { time: 6, text: "Lối đi riêng hai ta cùng bước" },
    { time: 12, text: "Trao nhau ánh mắt ngọt ngào như mong ước" },
    { time: 18, text: "Giữ chặt tay em trong ánh hoàng hôn..." },
  ],
  "track-06": [
    { time: 0, text: "Yêu Anh Giết Anh — RPT MCK" },
    { time: 5, text: "Lời yêu thương hóa thành ngọn lửa cuồng quay" },
    { time: 11, text: "Hơi thở nồng nàn còn vương đâu đây" },
    { time: 17, text: "Siết chặt đôi tay trong bóng đêm này..." },
    { time: 24, text: "Yêu anh hay giết anh trong nụ cười ấy..." },
  ],
};

export const DEFAULT_LYRICS: LyricLine[] = [
  { time: 0, text: "♪ (Intro Instrumental)" },
  { time: 4, text: "RPT MCK — HVL Official Track" },
  { time: 8, text: "Đêm dần trôi qua màn đêm tối" },
  { time: 13, text: "Tiếng nhạc cất lên từng câu nói" },
  { time: 18, text: "Chìm sâu vào không gian mê say" },
  { time: 23, text: "Giai điệu Dark Soul đong đầy..." },
  { time: 29, text: "Nhịp bass rền vang trong tâm trí" },
  { time: 35, text: "Không gian lặng yên khi người bước đi" },
  { time: 42, text: "♪ (Instrumental Solo & Beat drop)" },
  { time: 50, text: "RPT MCK — Dark Soul Era" },
];
