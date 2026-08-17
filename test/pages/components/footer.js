class Footer {

    get twitterIcon () {
        return $('//*[@id="twitter"]/ancestor-or-self::a[1]');
    }

    get linkedInIcon ()  {
        return $('//*[@id="linkedin"]/ancestor-or-self::a[1]');
    }
    
    get facebookIcon ()  {
        return $('//*[@id="facebook"]/ancestor-or-self::a[1]');
    }

}
export default new Footer;