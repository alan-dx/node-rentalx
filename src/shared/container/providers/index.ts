import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvier/IMailProvider';
import { EtherealMailProvider } from './MailProvier/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

// reigsterInstance cria a instancia assim que a app roda. Diferentemente do registerSingleton que so instancia qnd chama a primeira vez/
// cabe resaltar que tsyringe so cria uma instancia do EtherealMailProvider, assim como o singleton, porem ele cria qnd inicia a app
container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(), // Passa uma instancia ao inves da classe
);
