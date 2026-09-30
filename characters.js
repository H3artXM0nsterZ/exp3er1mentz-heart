// ============================================================
// DETAILED PIXEL CHARACTER SYSTEM
// Inspired by classic 16-bit / 32-bit RPG pixel characters.
// ============================================================

function drawPixelCharacter(canvas, type) {
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0a0410";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function px(x, y, sx, sy, c) {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(sx), Math.round(sy));
  }

  function p(x, y, w, h, color) {
    px(Math.round(x), Math.round(y), Math.round(w), Math.round(h), color);
  }

  // -------- FACE --------
  function detailedFace(skin, shadow, eyeColor = "#08050a") {
    // neck
    p(38, 42, 18, 12, skin);
    p(41, 48, 12, 7, shadow);

    // ears
    p(21, 20, 6, 17, skin);
    p(59, 20, 6, 17, skin);

    // face outline
    p(27, 8, 31, 3, "#241018");
    p(23, 12, 39, 29, "#241018");

    // face
    p(27, 11, 32, 30, skin);
    p(24, 17, 5, 15, skin);
    p(57, 17, 5, 15, skin);

    // face shading
    p(27, 30, 5, 9, shadow);
    p(54, 29, 5, 9, shadow);
    p(31, 37, 22, 4, shadow);

    // eyebrows
    p(30, 20, 9, 2, "#2a1219");
    p(48, 20, 9, 2, "#2a1219");

    // eyes
    p(29, 22, 11, 7, "#f6e6e8");
    p(47, 22, 11, 7, "#f6e6e8");

    p(34, 23, 5, 5, eyeColor);
    p(48, 23, 5, 5, eyeColor);

    // eye highlights
    p(35, 23, 2, 2, "#ffffff");
    p(49, 23, 2, 2, "#ffffff");

    // nose
    p(41, 28, 4, 3, shadow);
    p(44, 30, 4, 2, skin);

    // mouth
    p(38, 35, 12, 2, "#7c2939");
    p(41, 37, 7, 2, "#d35a70");
  }

  // -------- CURLY HAIR --------
  function curlyHair(base = "#21131b", light = "#5b3540", shadow = "#120b11") {
    // outer silhouette
    p(19, 8, 8, 22, shadow);
    p(22, 4, 12, 25, shadow);
    p(29, 1, 27, 13, shadow);
    p(43, 3, 19, 12, shadow);
    p(55, 8, 11, 23, shadow);
    p(60, 17, 8, 18, shadow);

    // main curls
    p(23, 8, 12, 15, base);
    p(31, 4, 13, 14, base);
    p(41, 5, 15, 12, base);
    p(51, 8, 12, 16, base);
    p(21, 17, 12, 12, base);
    p(54, 18, 12, 12, base);

    // individual pixel curls
    p(27, 6, 7, 5, light);
    p(36, 3, 8, 4, light);
    p(46, 6, 8, 4, light);
    p(55, 11, 6, 5, light);
    p(24, 15, 6, 6, light);

    // dark gaps between curls
    p(32, 14, 7, 3, shadow);
    p(43, 11, 7, 3, shadow);
    p(53, 17, 5, 3, shadow);
  }

  // -------- SCIENTIST --------
  function drawScientist() {
    // hair
    p(19, 7, 45, 13, "#08070b");
    p(22, 4, 35, 8, "#08070b");
    p(19, 13, 10, 19, "#08070b");
    p(56, 11, 10, 20, "#08070b");

    // hair highlights
    p(27, 7, 12, 2, "#21141e");
    p(43, 5, 10, 2, "#21141e");

    // hair falling over forehead
    p(28, 13, 9, 7, "#08070b");
    p(47, 12, 12, 7, "#08070b");

    // neck
    p(38, 42, 18, 14, "#75472f");

    // face
    detailedFace("#75472f", "#5a3028", "#020205");

    // gloves
    p(11, 108, 12, 9, "#d7cbd1");
    p(68, 108, 12, 9, "#d7cbd1");

    // small pen
    p(60, 93, 2, 9, "#bd4777");
  }

  // -------- SUBJECT (Reanimated) --------
  function drawSubject() {
    // curly hair
    p(30, 0, 52, 16, "#1a0a0a");
    p(24, 12, 18, 8, "#1a0a0a");
    p(66, 12, 18, 8, "#1a0a0a");
    p(38, 22, 30, 8, "#b8926a");

    // face
    p(34, 26, 38, 30, "#b8926a");

    // eyes
    p(42, 38, 6, 4, "#3f586c");
    p(58, 38, 6, 4, "#3f586c");
    p(44, 40, 4, 2, "#000");
    p(60, 40, 4, 2, "#000");

    // stitches on face
    p(36, 50, 10, 2, "#5a3a3a");
    p(48, 48, 2, 6, "#c74a4a");
    p(58, 50, 10, 2, "#5a3a3a");
    p(54, 48, 2, 6, "#c74a4a");

    // torso
    p(44, 58, 18, 12, "#1a1a2a");
    p(30, 58, 12, 18, "#0a0a0a");
    p(64, 58, 12, 18, "#0a0a0a");

    // body
    p(26, 68, 56, 22, "#1a1a20");

    // pants
    p(34, 92, 14, 24, "#2a5a6a");
    p(58, 92, 14, 24, "#2a5a6a");

    // shoes
    p(26, 120, 20, 10, "#d9d9d9");
    p(60, 120, 20, 10, "#d9d9d9");
  }

  // -------- DOCTOR --------
  function drawDoctor() {
    // hair
    p(32, 0, 42, 14, "#5a3a4a");
    p(28, 12, 50, 10, "#4a2a3a");

    // face
    p(35, 28, 34, 28, "#c9906f");

    // eyes
    p(42, 38, 6, 4, "#6a7a8a");
    p(58, 38, 6, 4, "#6a7a8a");
    p(44, 40, 4, 2, "#2a2a2a");
    p(60, 40, 4, 2, "#2a2a2a");

    // coat
    p(26, 54, 54, 28, "#e8e8e8");
    p(32, 60, 40, 18, "#d9d9d9");

    // pants
    p(34, 92, 14, 24, "#4a4a5a");
    p(58, 92, 14, 24, "#4a4a5a");

    // shoes
    p(28, 120, 20, 10, "#5a5a5a");
    p(58, 120, 20, 10, "#5a5a5a");
  }

  // -------- EXPERIMENT (Stitched Reanimant) --------
  function drawExperiment() {
    // curly hair
    p(19, 8, 8, 22, "#120b11");
    p(22, 4, 12, 25, "#120b11");
    p(29, 1, 27, 13, "#120b11");
    p(43, 3, 19, 12, "#120b11");
    p(55, 8, 11, 23, "#120b11");
    p(60, 17, 8, 18, "#120b11");

    // main curls
    p(23, 8, 12, 15, "#151017");
    p(31, 4, 13, 14, "#151017");
    p(41, 5, 15, 12, "#151017");
    p(51, 8, 12, 16, "#151017");
    p(21, 17, 12, 12, "#151017");
    p(54, 18, 12, 12, "#151017");

    // neck
    p(38, 42, 18, 12, "#75462f");
    p(41, 48, 12, 7, "#5a3028");

    // face
    detailedFace("#75462f", "#5a3028", "#050308");

    // black eyes override
    p(33, 24, 5, 5, "#020106");
    p(49, 24, 5, 5, "#020106");

    // stitch across forehead
    p(29, 15, 10, 2, "#4b1c2a");
    p(31, 13, 2, 6, "#c95d76");
    p(36, 13, 2, 6, "#c95d76");

    // stitch on cheek
    p(52, 31, 8, 2, "#421723");
    p(54, 29, 2, 6, "#c95d76");

    // neck stitches
    p(39, 47, 14, 2, "#421723");
    p(42, 45, 2, 6, "#c95d76");
    p(48, 45, 2, 6, "#c95d76");

    // torso
    p(32, 108, 12, 2, "#481a29");
    p(36, 106, 2, 6, "#c95d76");

    // chain around wrist
    p(10, 103, 7, 3, "#75616b");
    p(6, 106, 7, 3, "#493942");
    p(69, 103, 7, 3, "#75616b");
  }

  // Draw based on type
  switch (type) {
    case "scientist":
      drawScientist();
      break;
    case "subject":
      drawSubject();
      break;
    case "doctor":
      drawDoctor();
      break;
    case "experiment":
      drawExperiment();
      break;
    default:
      drawScientist();
  }
}
