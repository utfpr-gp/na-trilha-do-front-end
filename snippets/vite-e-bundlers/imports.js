// Cadastrar trilha
import './vendor.js';
import $ from 'jquery'; // [!code highlight]
import 'jquery-mask-plugin'; // acrescenta o .mask() ao jQuery [!code highlight]
import { READ_ONLY_MESSAGE, canWrite, createTrail } from './api.js';
