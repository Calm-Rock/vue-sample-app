import { SimpleSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { Resource } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const provider = new WebTracerProvider({
  resource: Resource.default().merge(new Resource({
    // Replace with any string to identify this service in your system
    'service.name': 'vue-sample-app',
  })),
});
const exporter = new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
    // headers: {
    //   "signoz-access-token": "SigNoz-Cloud-Ingestion-Token-HERE"
    // }
  });
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register({
  contextManager: new ZoneContextManager(),

});

// Registering instrumentations
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations(),
  ],
});
