import { forwardRef, Module } from '@nestjs/common';

import { EmailConfirmationModule } from '@/auth/email-confirmation/email-confirmation.module';
import { TwoFactorAuthService } from '@/auth/two-factor-auth/two-factor-auth.service';
import { MailModule } from '@/libs/mail/mail.module';
import { UserModule } from '@/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [forwardRef(() => EmailConfirmationModule), MailModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService, TwoFactorAuthService],
	exports: [AuthService]
})
export class AuthModule {}
