package org.ncstudy.authentication.exceptions;

public class AuthChangesException extends Exception {
    public static final String CARD_NOT_EXIST = "Карта с таким ID не существует";
    public static final String BAD_LINK = "Ссылка недействительна";
    public static final String CARD_ALREADY_EXIST = "Карта с таким ID уже зарегистрирована";
    public static final String EMAIL_ALREADY_USED = "Карта с таким email уже зарегистрирована";

    public AuthChangesException(String message) {
        super(message);
    }
}
