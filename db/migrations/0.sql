USE haggle;


DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(64) NOT NULL,
  `image` bigint,
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
  `name` varchar(64) NOT NULL,
  `image` bigint,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


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
