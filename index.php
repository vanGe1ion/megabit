﻿<?php

require_once "application/core/config.php";
ini_set('session.gc_maxlifetime', SESS_LIFETIME);
session_start();

ini_set('display_errors', 1);
require_once 'application/bootstrap.php';
