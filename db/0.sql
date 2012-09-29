USE haggle;

CREATE TABLE IF NOT EXISTS `item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `queue` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `pid` bigint unsigned NOT NULL,
  `uid` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX(`pid`, `uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `haggle` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `start_time` TIMESTAMP NOT NULL,
  `pid` bigint unsigned NOT NULL,
  `uid` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  INDEX(start_time),
  UNIQUE INDEX(`pid`, `uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
