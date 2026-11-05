import { genSalt, hash } from 'bcrypt-ts';
import { compareSync } from 'bcrypt-ts';

async function hashPassword(password: string) {
  const saltRounds = await genSalt(10);
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

const senhaNaoHasheada = 'senha-secreta-03';

const senhaHasheada = await hashPassword(senhaNaoHasheada);

console.log(senhaHasheada);
console.log(compareSync(senhaNaoHasheada, senhaHasheada));
