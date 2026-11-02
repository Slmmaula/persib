// Alamat dan kontak resmi PERSIB.
// Jika peta tidak tampil, buka Google Maps, pilih Bagikan, lalu Sematkan peta, dan tempel nilai src ke mapEmbedUrl.

const query = "Graha PERSIB, Jalan Sulanjana No. 17, Bandung";

export const contact = {
  addressLines: ["Graha PERSIB Lantai 3", "Jalan Sulanjana No. 17, Bandung"],
  phone: { label: "+6222 4221933", href: "tel:+62224221933" },
  email: "info@persib.co.id",
};

export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const mapAddress = query;
