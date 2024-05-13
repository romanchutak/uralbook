import { ParseIntPipe, Param } from '@nestjs/common';
import { CONTROLLER_ID_PARAM } from '@root/modules/common/constants';

export const ParamId = () => Param(CONTROLLER_ID_PARAM, new ParseIntPipe());
