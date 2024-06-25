DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB;

INSERT INTO `users` VALUES (14,'admin','$2b$10$2Ssk6bM9qgxx./6eZtQdgOj.fgE/eQz54jp6rK/tqEuIREYn512bS','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoicmVkaGEiLCJpYXQiOjE3MTkyNjkxNDgsImV4cCI6MTcxOTM1NTU0OH0.AXbKuGCYwX_aAYV5YTANI2duygmUEbWHVmWRr8mm_BI');

DROP TABLE IF EXISTS `barang`;
CREATE TABLE `barang` (
  `kode` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `stok` int DEFAULT '0',
  `deskripsi` varchar(500) DEFAULT 'Tidak ada deskripsi',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`kode`)
) ENGINE=InnoDB;

DROP TABLE  IF EXISTS `barang_masuk`;
CREATE TABLE `barang_masuk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tanggal_masuk` date NOT NULL,
  `jumlah` int DEFAULT '0',
  `deskripsi` text,
  `kode_barang` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_kode_barang` (`kode_barang`),
  CONSTRAINT `fk_kode_barang` FOREIGN KEY (`kode_barang`) REFERENCES `barang` (`kode`)
) ENGINE=InnoDB;

DROP TABLE  IF EXISTS `barang_keluar`;
CREATE TABLE `barang_keluar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kode_barang` varchar(255) NOT NULL,
  `tanggal_keluar` date NOT NULL,
  `jumlah` int DEFAULT '0',
  `deskripsi` text,
  PRIMARY KEY (`id`),
  KEY `kode_barang` (`kode_barang`),
  CONSTRAINT `barang_keluar_ibfk_1` FOREIGN KEY (`kode_barang`) REFERENCES `barang` (`kode`)
) ENGINE=InnoDB;







