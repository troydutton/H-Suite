LOWER_BOUND = 34
SHIFTED_UPPER_BOUND = 93


def encrypt(inputText: str, N: int, D: int):
    encrypted = ""
    for char in reversed(inputText):
        # Shift character
        shifted_ascii = (
            ((ord(char) - LOWER_BOUND) + N * D) % SHIFTED_UPPER_BOUND
        ) + LOWER_BOUND

        # Append encrypted character
        encrypted += chr(shifted_ascii)

    return encrypted


def decrypt(inputText: str, N: int, D: int):
    decrypted = ""
    for char in reversed(inputText):
        # Shift character
        shifted_ascii = (
            ((ord(char) - LOWER_BOUND) - N * D) % SHIFTED_UPPER_BOUND
        ) + LOWER_BOUND

        # Append decrypted character
        decrypted += chr(shifted_ascii)

    return decrypted
