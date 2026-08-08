# Seconda infornata: foto per pagine servizio (progettazione) e articoli news
Add-Type -AssemblyName System.Drawing
$srcDir = "C:\Users\Admin\OneDrive\Desktop\NVNimpresaedile.it\_build\photos-src\Nvnimpresa"
$outDir = "C:\Users\Admin\OneDrive\Desktop\NVNimpresaedile.it\images"

function Get-Src($num) {
  return (Get-ChildItem $srcDir -Filter "*WA$num.jpg" | Select-Object -First 1).FullName
}

function Export-Cover($num, $outName, $targetW, $targetH, $quality = 84) {
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

function Save-Jpeg($bitmap, $path, $quality) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), $quality
  $bitmap.Save($path, $codec, $params)
}

Write-Output "Generazione foto aggiuntive (servizio progettazione + articoli news)..."

# Servizio progettazione — esterno struttura in legno moderna, ottimo per "buona progettazione"
Export-Cover '0097' 'feat-progettazione.jpg' 1000 750 84

# News: quanto costa ristrutturare — corridoio con ascensore in posa, lavoro complesso
Export-Cover '0100' 'feat-news-costi.jpg' 1000 750 84

# News: bonus ristrutturazione — camino d'arredo, risultato finale di pregio
Export-Cover '0075' 'feat-news-bonus.jpg' 1000 750 84

# News: cartongesso — struttura metallica con impianti idraulici a vista
Export-Cover '0083' 'feat-news-cartongesso.jpg' 1000 750 84

# News: tetti in legno — struttura di copertura in legno con lucernario
Export-Cover '0004' 'feat-news-tetti.jpg' 1000 750 84

Write-Output "Fatto."
