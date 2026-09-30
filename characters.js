// ============================================================
// DETAILED PIXEL CHARACTER SYSTEM - GOTHIC SCIENCE STYLE
// Inspired by dark pixel art with laboratory aesthetic
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

  // -------- SCIENTIST (Dark Academia Style) --------
  function drawScientist() {
    // Hair - dark, slicked back
    p(25, 2, 60, 8, "#0a0a0a");
    p(20, 8, 70, 12, "#0a0a0a");
    p(28, 18, 54, 6, "#1a1520");
    p(32, 22, 46, 4, "#2a2228");

    // Face
    p(35, 24, 40, 32, "#c9906f");
    
    // Eyes
    p(42, 32, 7, 5, "#2a2a2a");
    p(61, 32, 7, 5, "#2a2a2a");
    p(44, 34, 3, 2, "#000");
    p(63, 34, 3, 2, "#000");
    p(45, 33, 1, 1, "#fff");
    p(64, 33, 1, 1, "#fff");

    // Nose
    p(51, 40, 4, 3, "#8a6b54");

    // Mouth
    p(42, 48, 18, 2, "#8a5a6a");
    p(46, 50, 10, 2, "#c97a8a");

    // Neck
    p(40, 56, 30, 8, "#c9906f");
    p(42, 58, 26, 3, "#8a6b54");

    // Lab coat - dark with lapels
    p(20, 60, 70, 50, "#1a1a20");
    p(25, 64, 12, 40, "#0a0a0a");
    p(73, 64, 12, 40, "#0a0a0a");
    
    // Coat front pockets
    p(32, 70, 8, 10, "#0a0a0a");
    p(70, 70, 8, 10, "#0a0a0a");

    // Shirt underneath (dark purple)
    p(42, 68, 26, 8, "#3a2a3a");
    
    // Hands/sleeves
    p(18, 100, 10, 20, "#c9906f");
    p(72, 100, 10, 20, "#c9906f");

    // Gloves (leather)
    p(16, 118, 14, 8, "#8a7a7a");
    p(70, 118, 14, 8, "#8a7a7a");

    // Pants
    p(32, 110, 16, 25, "#2a1a2a");
    p(62, 110, 16, 25, "#2a1a2a");

    // Shoes
    p(28, 135, 20, 8, "#5a5a5a");
    p(62, 135, 20, 8, "#5a5a5a");
  }

  // -------- SUBJECT (Reanimated with Stitches) --------
  function drawSubject() {
    // Hair - dark, messy, partially disheveled
    p(22, 0, 66, 10, "#1a0a0a");
    p(18, 8, 14, 6, "#1a0a0a");
    p(68, 8, 14, 6, "#1a0a0a");
    p(26, 14, 58, 8, "#2a1a2a");
    p(32, 20, 46, 4, "#3a2a3a");

    // Face
    p(34, 24, 42, 34, "#b8926a");
    
    // Dead eyes (hollow)
    p(42, 34, 8, 6, "#3a3a4a");
    p(60, 34, 8, 6, "#3a3a4a");
    p(45, 36, 2, 2, "#1a1a1a");
    p(63, 36, 2, 2, "#1a1a1a");

    // Nose (pale, slightly decayed)
    p(50, 42, 5, 3, "#9a7a5a");

    // Mouth with stitches
    p(40, 50, 20, 2, "#5a3a3a");
    p(45, 48, 2, 6, "#d45a6a"); // stitch red
    p(55, 48, 2, 6, "#d45a6a"); // stitch red

    // Face stitches
    p(32, 28, 4, 1, "#5a3a3a");
    p(32, 26, 1, 4, "#d45a6a");
    p(74, 28, 4, 1, "#5a3a3a");
    p(74, 26, 1, 4, "#d45a6a");

    // Neck stitches (crude reanimation marks)
    p(40, 58, 30, 2, "#4a2a3a");
    p(44, 56, 2, 6, "#d45a6a");
    p(54, 56, 2, 6, "#d45a6a");

    // Neck
    p(40, 58, 30, 6, "#b8926a");

    // Body - tattered gown
    p(25, 64, 60, 45, "#2a1a2a");
    p(20, 70, 70, 8, "#1a0a1a");

    // Arm wraps / bandages
    p(15, 85, 12, 35, "#d9c9c9");
    p(18, 88, 6, 6, "#1a0a1a");
    p(18, 98, 6, 6, "#1a0a1a");
    p(18, 108, 6, 6, "#1a0a1a");

    p(73, 85, 12, 35, "#d9c9c9");
    p(76, 88, 6, 6, "#1a0a1a");
    p(76, 98, 6, 6, "#1a0a1a");
    p(76, 108, 6, 6, "#1a0a1a");

    // Hands (slightly grey/decayed)
    p(14, 120, 12, 18, "#9a8a8a");
    p(74, 120, 12, 18, "#9a8a8a");

    // Pants
    p(33, 110, 16, 25, "#1a0a1a");
    p(61, 110, 16, 25, "#1a0a1a");

    // Bare feet (pale, cold)
    p(30, 135, 20, 8, "#d0a8c0");
    p(60, 135, 20, 8, "#d0a8c0");
  }

  // -------- DOCTOR (Authority Figure) --------
  function drawDoctor() {
    // Hair - grey/white, stern
    p(28, 2, 54, 6, "#5a5a6a");
    p(25, 8, 60, 10, "#5a5a6a");
    p(30, 18, 50, 6, "#4a4a5a");

    // Face - serious, older
    p(36, 22, 38, 32, "#c9906f");
    
    // Eyes (cold, calculating)
    p(43, 32, 7, 5, "#5a6a7a");
    p(60, 32, 7, 5, "#5a6a7a");
    p(45, 34, 3, 2, "#1a1a1a");
    p(62, 34, 3, 2, "#1a1a1a");

    // Nose
    p(51, 40, 4, 3, "#8a6b54");

    // Mouth (thin, disapproving)
    p(42, 50, 16, 1, "#8a5a6a");

    // Neck
    p(40, 54, 30, 8, "#c9906f");

    // Lab coat - white/cream, pristine
    p(18, 60, 74, 55, "#e8e8e8");
    p(20, 64, 70, 45, "#d9d9d9");
    
    // Coat seams
    p(28, 65, 1, 40, "#c9c9c9");
    p(82, 65, 1, 40, "#c9c9c9");

    // Stethoscope around neck
    p(45, 58, 20, 2, "#5a5a5a");
    p(50, 60, 2, 4, "#5a5a5a");
    p(58, 60, 2, 4, "#5a5a5a");

    // Shirt collar (formal)
    p(42, 62, 26, 4, "#2a1a2a");

    // Hands
    p(18, 105, 12, 20, "#c9906f");
    p(70, 105, 12, 20, "#c9906f");

    // Pants
    p(35, 112, 14, 23, "#3a3a4a");
    p(61, 112, 14, 23, "#3a3a4a");

    // Shoes (polished)
    p(30, 135, 20, 8, "#4a4a5a");
    p(60, 135, 20, 8, "#4a4a5a");
  }

  // -------- EXPERIMENT (Heavily Stitched Monstrosity) --------
  function drawExperiment() {
    // Hair - torn, patched
    p(18, 2, 14, 12, "#1a0a0a");
    p(32, 0, 36, 10, "#1a0a0a");
    p(68, 4, 14, 10, "#1a0a0a");
    p(22, 12, 56, 8, "#0a0a0a");
    p(28, 20, 44, 6, "#1a0a0a");

    // Face - half decayed, half stitched
    p(34, 24, 42, 34, "#9a7a5a");

    // Dead eyes (completely black)
    p(42, 34, 8, 6, "#1a1a1a");
    p(60, 34, 8, 6, "#1a1a1a");

    // Nose - partially missing
    p(52, 42, 3, 2, "#6a5a4a");

    // Mouth - sewn shut
    p(38, 50, 24, 2, "#4a2a3a");
    p(42, 48, 2, 6, "#c95a7a");
    p(50, 48, 2, 6, "#c95a7a");
    p(58, 48, 2, 6, "#c95a7a");

    // Face stitches (extensive)
    p(28, 26, 6, 1, "#4a2a3a");
    p(28, 24, 1, 4, "#c95a7a");
    p(34, 28, 4, 1, "#4a2a3a");
    p(34, 26, 1, 4, "#c95a7a");
    p(72, 26, 6, 1, "#4a2a3a");
    p(76, 24, 1, 4, "#c95a7a");
    p(70, 30, 4, 1, "#4a2a3a");
    p(72, 28, 1, 4, "#c95a7a");

    // Neck - heavily stitched
    p(38, 58, 34, 8, "#7a5a4a");
    p(40, 56, 30, 2, "#4a2a3a");
    p(45, 54, 2, 6, "#c95a7a");
    p(55, 54, 2, 6, "#c95a7a");
    p(65, 54, 2, 6, "#c95a7a");

    // Body - patchwork corpse
    p(22, 64, 66, 50, "#1a0a1a");
    p(25, 68, 18, 30, "#0a0a0a");
    p(67, 68, 18, 30, "#0a0a0a");
    p(45, 70, 20, 35, "#2a1a1a");

    // Stitches down center of body
    p(54, 66, 2, 40, "#c95a7a");
    p(52, 70, 1, 4, "#4a2a3a");
    p(56, 76, 1, 4, "#4a2a3a");
    p(52, 84, 1, 4, "#4a2a3a");
    p(56, 92, 1, 4, "#4a2a3a");

    // Arms - skeletal with patches
    p(14, 90, 10, 30, "#5a4a4a");
    p(76, 90, 10, 30, "#5a4a4a");

    // Hand restraints/shackles
    p(10, 110, 3, 15, "#7a6a6a");
    p(97, 110, 3, 15, "#7a6a6a");

    // Hands (corpse-like)
    p(12, 120, 14, 20, "#6a5a5a");
    p(74, 120, 14, 20, "#6a5a5a");

    // Legs - uneven
    p(32, 112, 14, 23, "#0a0a0a");
    p(64, 112, 14, 23, "#0a0a0a");

    // Feet (bare, blue-grey from death)
    p(28, 135, 22, 8, "#6a8a9a");
    p(60, 135, 22, 8, "#6a8a9a");
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
