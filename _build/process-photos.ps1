# Ritaglia/ottimizza le foto selezionate dallo zip del cliente e le salva in images/
Add-Type -AssemblyName System.Drawing

$srcDir = "C:\Users\Admin\OneDrive\Desktop\NVNimpresaedile.it\_build\photos-src\Nvnimpresa"
$outDir = "C:\Users\Admin\OneDrive\Desktop\NVNimpresaedile.it\images"
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

function Get-Src($num) {
  return (Get-ChildItem $srcDir -Filter "*WA$num.jpg" | Select-Object -First 1).FullName
}

# Ridimensiona e ritaglia (cover-crop) a targetW x targetH
function Export-Cover($num, $outName, $targetW, $targetH, $quality = 82) {
  $src = Get-Src $num
  $img = [System.Drawing.Image]::FromFile($src)
  $srcRatio = $img.Width / $img.Height
  $targetRatio = $targetW / $targetH
  if ($srcRatio -gt $targetRatio) {
    $scaledH = $targetH
    $scaledW = [int]($targetH * $srcRatio)
  } else {
    $scaledW = $targetW
    $scaledH = [int]($targetW / $srcRatio)
  }
  $resized = New-Object System.Drawing.Bitmap $scaledW, $scaledH
  $g = [System.Drawing.Graphics]::FromImage($resized)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $scaledW, $scaledH)
  $g.Dispose()
  $img.Dispose()

  $cropX = [int](($scaledW - $targetW) / 2)
  $cropY = [int](($scaledH - $targetH) / 2)
  $cropRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $targetW, $targetH
  $final = $resized.Clone($cropRect, $resized.PixelFormat)
  $resized.Dispose()

  Save-Jpeg $final (Join-Path $outDir $outName) $quality
  $final.Dispose()
  Write-Output "  OK $outName $targetW x $targetH from WA$num"
}

# Ridimensiona senza ritaglio (fit dentro maxW x maxH, mantiene proporzioni)
function Export-Fit($num, $outName, $maxW, $maxH, $quality = 82) {
  $src = Get-Src $num
  $img = [System.Drawing.Image]::FromFile($src)
  $ratio = [Math]::Min($maxW / $img.Width, $maxH / $img.Height)
  if ($ratio -gt 1) { $ratio = 1 }
  $w = [int]($img.Width * $ratio)
  $h = [int]($img.Height * $ratio)
  $final = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($final)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $w, $h)
  $g.Dispose()
  $img.Dispose()
  Save-Jpeg $final (Join-Path $outDir $outName) $quality
  $final.Dispose()
  Write-Output "  OK $outName $w x $h fit from WA$num"
}

function Save-Jpeg($bitmap, $path, $quality) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), $quality
  $bitmap.Save($path, $codec, $params)
}

Write-Output "Generazione immagini ottimizzate..."

# Hero
Export-Cover '0099' 'hero-nuova-costruzione.jpg' 1600 1000 84

# Service card (homepage, 3 card servizi)
Export-Cover '0034' 'svc-ristrutturazioni.jpg' 800 600 82
Export-Cover '0009' 'svc-tetti-cappotti.jpg' 800 600 82
Export-Cover '0035' 'svc-finiture.jpg' 800 600 82

# Griglia lavori (tile 4:5)
Export-Cover '0040' 'work-ristrutturazione-completa.jpg' 640 800 80
Export-Cover '0038' 'work-bagno.jpg' 640 800 80
Export-Cover '0010' 'work-tetto-legno.jpg' 640 800 80
Export-Cover '0061' 'work-cappotto-termico.jpg' 640 800 80
Export-Cover '0090' 'work-cartongesso.jpg' 640 800 80
Export-Cover '0098' 'work-facciata.jpg' 640 800 80
Export-Cover '0080' 'work-imbiancatura.jpg' 640 800 80
Export-Cover '0056' 'work-pavimenti.jpg' 640 800 80
Export-Cover '0035' 'work-chiavi-in-mano.jpg' 640 800 80

# Attrezzatura
Export-Fit '0051' 'attrezzatura-laser.jpg' 700 900 84

# Banner pagine interne (riusato su tutte le pagine servizio/zona/news/ecc.)
Export-Cover '0060' 'banner-cantiere.jpg' 1920 700 80

Write-Output "Fatto."