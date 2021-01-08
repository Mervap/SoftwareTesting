abstract class CurrentUser {
  readonly username: string;

  constructor(username: string) {
    this.username = username;
  }
}
class UnknownUser extends CurrentUser {
  constructor() { super("Guest") }
}
class GuestUser extends CurrentUser {
  constructor() { super("Guest") }
}
class AuthenticatedUser extends CurrentUser {}

export {CurrentUser, UnknownUser, GuestUser, AuthenticatedUser};