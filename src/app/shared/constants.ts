export class PathNames {
    public static LOGIN = 'login';
    public static REGISTER = 'register';
    public static DASHBOARD = 'dashboard';
    public static MAIN = 'main';
    public static FILES = 'files';
}

export class ServerUrls {
    public static BASE_URL = 'http://u08w8g4coo4sco00k8o48804.184.174.33.128.sslip.io/v1';

    // Auth
    public static REGISTER = `${ServerUrls.BASE_URL}/auth/register`;
    public static LOGIN = `${ServerUrls.BASE_URL}/auth/login`;
    public static USER_DETAILS = `${ServerUrls.BASE_URL}/auth/me`;

    // Files
    public static FILES = `${ServerUrls.BASE_URL}/docs`;
    public static FILES_COUNT = `${ServerUrls.FILES}/count`;
}