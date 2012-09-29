USE haggle;


DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(64) NOT NULL,
  `description` varchar(255),
  `quantity` int,
  `condition` varchar(32),
  `location` varchar(64),
  `shipping` varchar(64),
  `min_price` decimal(20, 2),
  `max_price` decimal(20, 2),
  `extra_haggles` varchar(4),
  `image` bigint,
  `min_price` float,
  `max_price` float,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(64) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(64) NOT NULL,
  `image` bigint,
  `haggles` bigint,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO user (`username`, `email`, `password`, `image`) VALUES ('ben', 'ben@goinstant.com', 'ben', 1);
INSERT INTO image () VALUES ();
INSERT INTO user (`username`, `email`, `password`, `image`) VALUES ('gordie', 'gordie@goinstant.com', 'gordie', 2);
INSERT INTO image () VALUES ();
INSERT INTO user (`username`, `email`, `password`, `image`) VALUES ('chris', 'chris@alltimelowe.com', 'chris', 3);
INSERT INTO image () VALUES ();
INSERT INTO user (`username`, `email`, `password`, `image`) VALUES ('eran', 'eran@springleap.com', 'eran', 4);
INSERT INTO image () VALUES ();

DROP TABLE IF EXISTS `queue`;
CREATE TABLE IF NOT EXISTS `queue` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `pid` bigint unsigned NOT NULL,
  `uid` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX(`pid`, `uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `haggle`;
CREATE TABLE IF NOT EXISTS `haggle` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `start_time` TIMESTAMP NOT NULL,
  `status` int DEFAULT 0,
  `pid` bigint unsigned NOT NULL,
  `uid` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  INDEX(start_time),
  UNIQUE INDEX(`pid`, `uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
