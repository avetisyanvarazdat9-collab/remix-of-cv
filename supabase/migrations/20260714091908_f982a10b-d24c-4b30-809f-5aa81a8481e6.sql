CREATE OR REPLACE FUNCTION public.navigation_menu_autofill_label()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.label IS NULL OR btrim(NEW.label) = '' THEN
    NEW.label := COALESCE(
      NULLIF(btrim(NEW.label_en), ''),
      NULLIF(btrim(NEW.label_hy), ''),
      NULLIF(btrim(NEW.label_ru), ''),
      NEW.path,
      'item'
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS navigation_menu_autofill_label_trg ON public.navigation_menu;
CREATE TRIGGER navigation_menu_autofill_label_trg
BEFORE INSERT OR UPDATE ON public.navigation_menu
FOR EACH ROW EXECUTE FUNCTION public.navigation_menu_autofill_label();