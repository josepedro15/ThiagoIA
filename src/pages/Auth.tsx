import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white text-black p-8 border-4 border-black shadow-brutalist-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-black">
            Thiago<span className="text-[#00f3ff] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">IA</span>
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-gray-800">
            Acesso Restrito
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#00f3ff',
                  brandButtonText: 'white',
                },
                space: {
                  buttonPadding: '14px',
                  inputPadding: '14px',
                },
                borderWidths: {
                  buttonBorderWidth: '4px',
                  inputBorderWidth: '4px',
                },
                radii: {
                  borderRadiusButton: '0px',
                  buttonBorderRadius: '0px',
                  inputBorderRadius: '0px',
                },
              },
            },
            className: {
              button: 'shadow-brutalist hover:shadow-brutalist-neon transition-shadow border-black uppercase font-bold tracking-wider',
              input: 'border-black shadow-brutalist focus:shadow-brutalist-neon focus:border-black font-bold',
              label: 'font-bold uppercase tracking-wider text-xs',
            }
          }}
          providers={[]}
        />
      </div>
    </div>
  );
}
